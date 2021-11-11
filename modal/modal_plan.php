<div id="PlanesModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_plan" id="frm_plan" class="needs-validation" novalidate onsubmit="return check()">
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Editar Planes</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Plan</label>
						<input type="hidden" name="id" id="id">
						<input type="hidden"name="id_carrera">
						<input type="number" name="name" id="name" class="form-control" maxlength="2" min="0" max="99"  placeholder="Numero de Plan" required>
						<div class="invalid-feedback">
          					Llenar campo.
        				</div>
					</div>		
					<div class="form-group">
						<label>Hs catedras semanales</label>
						<input type="text" name="horas_catedra" id="horas_catedra" class="form-control" maxlength="4" size="10" min="0"  placeholder="Horas catedras semanales" required>
						<div class="invalid-feedback">
          					Llenar campo.
        				</div>
					</div>
					<div class="form-group">
						<label>Hs reloj anuales</label>
						<input type="number" name="horas_reloj" id="horas_reloj" class="form-control" maxlength="4" min="0" placeholder="Horas reloj anuales" required>
						<div class="invalid-feedback">
          					Llenar campo.
        				</div> 
					</div>
					<div class="form-group" require>
						<label>Estado</label>
						<select name="estado" id="estado" class="form-control" required>
							<option value="0">Activo</option>
							<option value="1">Inactivo</option>
						</select>
						<div class="invalid-feedback">
          					Llenar campo.
        				</div>
					</div>
				</div>
				<div class="modal-footer">
					<input type="submit" class="btn btn-info" value="Guardar datos">
					<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
				</div>
			</form>
		</div>
	</div>
</div>

<script>

    (function () {
      'use strict'
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
			
		  form.classList.add('was-validated')
        }, false) 
      })
    })()
	
</script>