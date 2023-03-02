<div id="MateriasModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_materia" id="frm_materia" class="needs-validation"  novalidate onsubmit="return check()" >
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Editar Materias</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<input type="hidden" name="id" id="id">
						<label for="validationCustom01" class="form-label">Materias</label>
						<input type="text" name="name" id="id" class="form-control" required>
						<div class="invalid-feedback">
          					Llenar campo.
        				</div>
						
					</div>		
					<div class="form-group">
						<label>Descripción</label>
						<textarea name="descripcion" id="descripcion" rows="5" cols="30" class="form-control" placesholder="Escriba su descripción aquí..." ></textarea>
						</select>
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

<script>
	
		

	
	
	
	
	

</script>