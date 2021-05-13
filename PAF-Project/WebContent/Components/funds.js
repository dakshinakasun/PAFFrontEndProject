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
	if ($("#FundCode").val().trim() == "")
	{
		return "Insert Fund Code.";
	}
	
	// NAME
	if ($("#FundName").val().trim() == "")
	{
		return "Insert Fund Name.";
	}
	
	// SPONSER
	if ($("#FundSponser").val().trim() == "")
	{
		return "Insert Fund Sponser.";
	}
	
	// EMAIL
	if ($("#Email").val().trim() == "")
	{
		return "Insert Email.";
	}
	
	// MOBILE
	if ($("#Mobile").val().trim() == "")
	{
		return "Insert Mobile Number.";
	}
	
	// is numerical value
	var tmpMobile = $("#Mobile").val().trim();
	if (!$.isNumeric(tmpMobile))
	{
		return "Insert a numbers for Mobile.";
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