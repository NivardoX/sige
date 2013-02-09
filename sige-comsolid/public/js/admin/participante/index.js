var oTablePes;
$(document).ready(function() {
	
   $("#nome_pessoa").select();
	$('#radioset_tipo_busca').buttonset();
   
   buscar();
	
	oTablePes = $('#pessoas').dataTable( {
		"sPaginationType" : "full_numbers",
		"aaSorting": [  ],
		"bFilter": false
	});

	$("#nome_pessoa").autocomplete({
		source: function() {
			buscar();
		}
	});
	
   $('input:radio').click(function() {
		$("#nome_pessoa").select();
      buscar();
   });

	$(document).delegate('a.situacao', 'click', function() {
      //console.log($(this).attr('data-url'));
      presenca($(this).attr('data-url'));
   });
});

function buscar() {
   $("#loading").show();
	var idEncontro = $("#id_encontro").val();
	var nomePessoa = $("#nome_pessoa").val();
	var tipo_busca= $('input:radio[name=t_busca]:checked').val();
   
   /*$.getJSON("/admin/participante/ajax-buscar/tbusca/"+tipo_busca+"/idEncontro/"+idEncontro+"/nomePessoa/"+nomePessoa, function(json){
      oTablePes.fnClearTable();
      if(json.size>0) {
         oTablePes.fnAddData(json.aaData);
      }
   }).complete(function() {
      $("#loading").hide();
   });*/
   $.ajax({
      url: "/admin/participante/ajax-buscar/tbusca/"+tipo_busca+"/idEncontro/"+idEncontro+"/nomePessoa/"+nomePessoa,
      contentType: "application/x-www-form-urlencoded; charset=utf-8;",
      type: 'POST',
      success: function( json ) {
         oTablePes.fnClearTable();
         if(json.size>0) {
            oTablePes.fnAddData(json.aaData);
         }
      },
      complete: function() {
         $("#loading").hide();
      }
   });
}

function presenca(url) {
   $.getJSON(url, function(json) {
      if (json.ok) {
         mostrarMensagem("div.success", json.msg);
      } else if (json.erro != null) {
         mostrarMensagem("div.error", json.erro);
      }
   }).complete(function() {
      buscar();
   });
}

function mostrarMensagem( id, msg ) {
   var aux = (msg != null) ? msg : "Erro desconhecido.";
   $(id).html( aux ).show( "blind", 500, esconderMensagem(id) );
}

function esconderMensagem(id) {
   setTimeout(function() {
      $( id + ":visible" ).fadeOut();
   }, 3000 );
}