<%@page import="com.Fund"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1"> 
<title>Fund</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/funds.js"></script>
</head>
<body>
	
	<div class="container">
		<div class="row">
			<div class="col-6">
				<div class="jumbotron jumbotron-fluid " style="width: 700px; margin-left: 200px; padding: 20px; "> 
 
	 				<h1> Fund Management </h1><br>
	 				
					<form id="formFund" name="formFund">
						Fund code:
						<input id="FundCode" name="FundCode" type="text" placeholder="Enter Fund Code" class="form-control form-control-sm">
						<br> Fund name:
						<input id="FundName" name="FundName" type="text" placeholder="Enter Fund Name" class="form-control form-control-sm">
						<br> Fund sponser:
						<input id="FundSponser" name="FundSponser" type="text" placeholder="Enter Fund Sponser" class="form-control form-control-sm">
						<br> Email:
						<input id="Email" name="Email" type="text" placeholder="Enter Email" class="form-control form-control-sm">
						<br> Mobile:
						<input id="Mobile" name="Mobile" type="text" placeholder="Enter Mobile Number" class="form-control form-control-sm">
						<br> Fund price:
						<input id="FundPrice" name="FundPrice" type="text" placeholder="Enter Fund Price" class="form-control form-control-sm">
						<br> Fund description:
						<input id="FundDesc" name="FundDesc" type="text" placeholder="Enter Description" class="form-control form-control-sm">
						<br>
						<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
						<input type="hidden" id="hidFundIDSave" name="hidFundIDSave" value="">
					</form>
				
				
				
					<div id="alertSuccess" class="alert alert-success">
				
					</div>
				
					<div id="alertError" class="alert alert-danger">
				
					</div>	
					
				</div>
							
					<br>				
				
					<div id="divFundsGrid">
						<%
							Fund fundObj = new Fund();
							out.print(fundObj.readFunds());
						%>
					</div>
			</div>
		</div> 
	</div>
		
</body>
</html>