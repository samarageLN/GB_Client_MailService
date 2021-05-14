/**
 * 
 */

$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event) {

	// 1 - clear the alert boxes (success and error)
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();

	$("#alertError").text("");
	$("#alertError").hide();

	// then we need to call the validate method
	var status = validateItemform();

	console.log(status);

	// if not properly validated
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// if valid.....submit the form
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	//	$("#formItem").submit();
	$.ajax({
		url : "MailsAPI",
		type : type,
		data : $("#formItem").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		}
	});

});

function onItemSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}

//implementing the update button handler
$(document).on(
		"click",
		".btnUpdate",
		function(event) {

			// getting the hidden column value of which the clicked update
			// button exist
			$("#hidItemIDSave").val($(this).data("mailId"));
			// loading the data to the form again
			$("#to").val($(this).closest("tr").find('td:eq(0)').text());
			$("#subject").val($(this).closest("tr").find('td:eq(1)').text());
			$("#message").val($(this).closest("tr").find('td:eq(2)').text());

		});



$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "MailsAPI",
		type : "DELETE",
		data : "itemID=" + $(this).data("mailId"),
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
		}
	});
});



function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


function validateItemform() {

	if ($("#to").val().trim() == "") {
		return "Insert Receiptionist mail Address.";
	}

	if ($("#subject").val().trim() == "") {
		return "Insert Subject.";
	}

	if ($("#message").val().trim() == "") {
		return "Insert Message Body.";
	}

	return true;
}
