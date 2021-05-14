$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateFundForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid------------------------
	var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "FundsAPI",
		type : type,
		data : $("#formFund").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onFundSaveComplete(response.responseText, status);
		}
	});
});

function onFundSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
			
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
			
		}
	} else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
		
	} else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidFundIDSave").val("");
	$("#formFund")[0].reset();
}
//Remove ===========================================
$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "FundsAPI",
		type : "DELETE",
		data : "FundID=" + $(this).data("fundid"),
		dataType : "text",
		complete : function(response, status)
		{
			onFundDeleteComplete(response.responseText, status);
		}
	});
});

function onFundDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidFundIDSave").val($(this).closest("tr").find('#hidFundIDUpdate').val());
	$("#FundCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#FundName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#FundSponser").val($(this).closest("tr").find('td:eq(2)').text());
	$("#Email").val($(this).closest("tr").find('td:eq(3)').text());
	$("#Mobile").val($(this).closest("tr").find('td:eq(4)').text());
	$("#FundPrice").val($(this).closest("tr").find('td:eq(5)').text());
	$("#FundDesc").val($(this).closest("tr").find('td:eq(6)').text());
});

// CLIENT-MODEL================================================================
function validateFundForm()
{
	// CODE
	//if ($("#FundCode").val().trim() == "")
	//{
	//	return "Insert Fund Code.";
	//}
	var fcode = $("#FundCode").val();
	
	//Cheack fund name empty or not
	if(fcode.length==0 && fcode.trim() == '')
	{
		return 'Insert Fund Code.';
	}
	
	//check mobile number only has numbers and 10 digits.
	else if(fcode.length > 1 && !(/^([A-Z0-9]{4})+$/.test(fcode)))
	{
		return 'Invalide Fund Code';
	}
	
	
	
	// NAME
	var name = $("#FundName").val();
	
	//Cheack fund name empty or not
	if(name == "" || name.trim().length == 0)
	{
		return 'Insert Fund Name.';
	}
	
	//check fund name only has letters and numbers
	else if(!(/^[A-Za-z 0-9-]+$/.test(name)))
	{
		return 'Invalide Fund Name';
	}
	
	// SPONSER
	var sponser = $("#FundSponser").val(); 
	
	//Cheack sponser name empty or not
	if(sponser == "" || sponser.trim().length == 0)
	{
		return 'Insert Sponser Name.';
	}
	
	//check sponse name only has letters.
	else if(!(/^[A-Za-z ]+$/.test(sponser)))
	{
		return 'Invalide Sponser Name';
	}

	var email = $("#Email").val(); 
	
	//Cheack email empty or not
	if(email == "" || email.trim().length == 0)
	{
		return 'Insert Email.';
	}
	
	//check email.
	else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
	{
		return 'Invalide Email';
	}
	
	
	
	// MOBILE
	var mobile = $("#Mobile").val();
	
	//Cheack mobile number empty or not
	if(mobile.length==0 && mobile.trim() == '')
	{
		return 'Insert Mobile Number.';
	}
	//check mobile number only has numbers and 10 digits.
	else if(mobile.length > 1 && !(/^([0-9]{10})+$/.test(mobile)))
	{
		return 'Insert Valide Mobile Number';
	}
	

	
	// PRICE-------------------------------
	if ($("#FundPrice").val().trim() == "")
	{
		return "Insert Fund Price.";
	}

	// is numerical value
	var tmpPrice = $("#FundPrice").val().trim();
	if (!$.isNumeric(tmpPrice))
	{
		return "Insert a numerical value for Fund Price.";
	}

	// convert to decimal price
	$("#FundPrice").val(parseFloat(tmpPrice).toFixed(2));

	// DESCRIPTION------------------------
	if ($("#FundDesc").val().trim() == "")
	{
		return "Insert Fund Description.";
	}
	
	return true;
}