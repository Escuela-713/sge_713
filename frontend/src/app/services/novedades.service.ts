import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Card {
  id: number;
  slug: string;
  backgroundImage: string;
  title: string;
  description: string;
  location: string;
  date: string;
  locationIcon: string;
  dateIcon: string;
}

export interface NovedadesData {
  carouselSlides: any[];
  sectionTitle: string;
  cards: Card[];
}

@Injectable({ providedIn: 'root' })
export class NovedadesService {
  private readonly storageKey = 'novedades-home';

  constructor(private http: HttpClient) {}

  private async loadFromAssets(): Promise<NovedadesData> {
    const data = await this.http
      .get<NovedadesData>('assets/novedades-home.json')
      .toPromise();
    return data || { carouselSlides: [], sectionTitle: '', cards: [] };
  }

  private saveToStorage(data: NovedadesData) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private readFromStorage(): NovedadesData | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as NovedadesData;
    } catch {
      return null;
    }
  }

  async getAll(): Promise<NovedadesData> {
    const stored = this.readFromStorage();
    if (stored) return stored;
    const assets = await this.loadFromAssets();
    this.saveToStorage(assets);
    return assets;
  }

  async getCardBySlug(slug: string): Promise<Card | undefined> {
    const data = await this.getAll();
    return data.cards.find(c => c.slug === slug);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  async addCard(input: Partial<Card> & { title: string; }): Promise<Card> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const newId = cards.length ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const slug = input.slug ? input.slug : this.generateSlug(input.title);
    const date = input.date ? input.date : new Date().toLocaleDateString();

    const newCard: Card = {
      id: newId,
      slug,
      backgroundImage: input.backgroundImage || '',
      title: input.title,
      description: input.description || '',
      location: input.location || '',
      date,
      locationIcon: input.locationIcon || '',
      dateIcon: input.dateIcon || ''
    };

    cards.push(newCard);
    data.cards = cards;
    this.saveToStorage(data);
    return newCard;
  }

  async updateCard(updated: Card): Promise<void> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const idx = cards.findIndex(c => c.id === updated.id);
    if (idx !== -1) {
      cards[idx] = { ...cards[idx], ...updated };
      data.cards = cards;
      this.saveToStorage(data);
    } else {
      throw new Error('Card not found');
    }
  }

  async deleteCardById(id: number): Promise<void> {
    const data = await this.getAll();
    const cards = data.cards || [];
    const newCards = cards.filter(c => c.id !== id);
    data.cards = newCards;
    this.saveToStorage(data);
  }
}
