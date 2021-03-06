
$(function() {
	var oTable = $('table').dataTable({
		'ordering': true,
		'filter': false,
		'info': true,
		'lengthChange': false,
		'paginate': true,
		'language': {
			'url': '/lib/js/data-tables/Portuguese-Brasil.json'
		}
	});

	function getDataEvento() {
		return $('input:radio.data_evento:checked').val();
	}

	function getTipoEvento() {
		return $('input:radio.tipo_evento:checked').val();
	}

	function addEvento(id) {

		if (id > 0) {
			var params = {
				id: id,
				format: 'json'
			};
	        var url = '/evento/ajax-interesse/';
			$.getJSON(url, params, function(json) {
				if (json.ok) {
	                alertify.success(_('Interesting event bookmarked.'));
				} else if (json.erro !== null) {
	                alertify.error(json.erro);
				}
			}).complete(function() {
				getValores();
			});
		}
	}

	function getValores() {
		$('#loading').show();
		var termo = $('#termo').val();
		var data_evento = getDataEvento();
		var tipo_evento = getTipoEvento();
	    var url = '/evento/ajax-buscar/';

		var params = {
			termo: termo,
			id_tipo_evento: tipo_evento,
			data: data_evento,
			format: 'json'
		};

		$.getJSON(url, params, function(json){
			oTable.fnClearTable();
			if (json.size > 0) {
				oTable.fnAddData(json.itens);
			}
		}).complete(function() {
			$('#loading').hide();
		});
	}

    $('#termo').select();
    getValores();
    $('#termo').autocomplete({
        source: function() {
            getValores();
        }
    });

	// evento Usado quando seleciar uma data do evento
	$('input:radio').change(function() {
		getValores();
	});

	$(document).delegate('a.marcar', 'click', function() {
		addEvento($(this).attr('id'));
	});
});
