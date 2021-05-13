package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class Fund {

	//method to connect to the DB
			private Connection connect(){
				
			Connection con = null;
			
			try{
				
			Class.forName("com.mysql.jdbc.Driver");
			//DBServer/DBName, username, password
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/paf_db", "root", "");
			
			}catch (Exception e){
				e.printStackTrace();
				}
			
			return con;
			
			}
			
			//Admin Read method
			public String readFunds(){
				
				String output = "";
			
				try{
					
					Connection con = connect();
			
					if (con == null){
						
						return "Error while connecting to the database for reading."; 
						
					}
			
					//html table to be displayed
			
					output = "<table class= table table-striped><tr><th>Fund Code</th>" + "<th>Fund Name</th>" + "<th>Fund Sponser</th>" + "<th>Email</th>" + "<th>Mobile</th>" + "<th>Fund Price</th>" + "<th>Fund Description</th>" + "<th>Update</th>" + "<th>Remove</th>";
					String query = "select * from fund";
					Statement stmt = con.createStatement();
					ResultSet rs = stmt.executeQuery(query);
			
					// iterate through the rows in the result set
					while (rs.next()){
			
						String FundID = Integer.toString(rs.getInt("FundID"));
						String FundCode = rs.getString("FundCode");
						String FundName = rs.getString("FundName");
						String FundSponser = rs.getString("FundSponser");
						String Email = rs.getString("Email");
						String Mobile = rs.getString("Mobile");
						String FundPrice = Double.toString(rs.getDouble("FundPrice"));
						String FundDesc = rs.getString("FundDesc");
			
						// Add into the html table
						output += "<tr><td><input id='hidFundIDUpdate' name='hidFundIDUpdate' type='hidden' value='" + FundID + "'>" + FundCode + "</td>";
						//output += "<tr><td>" + FundID + "</td>";
						//output += "<td>" + FundCode + "</td>";
						output += "<td>" + FundName + "</td>";
						output += "<td>" + FundSponser + "</td>";
						output += "<td>" + Email + "</td>";
						output += "<td>" + Mobile + "</td>";
						output += "<td>" + FundPrice + "</td>";
						output += "<td>" + FundDesc + "</td>";
			
						// buttons
						//output += "<td><input name='btnUpdate' type='button' value='Update' class='btn btn-secondary'></td>" + "<td><form method='post' action='items.jsp'>" + "<input name='btnRemove' type='submit' value='Remove' class='btn btn-danger'>" + "<input name='FundID' type='hidden' value='" + FundID + "'>" + "</form></td></tr>";
						output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td>" + "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-fundid='" + FundID + "'>" + "</td></tr>";
						
					}
			
					con.close();
			
					// Complete the html table
					output += "</table>";
			
				}catch (Exception e){
					
					output = "Error while reading the funds.";
					System.err.println(e.getMessage());
			
				}
			
				return output;
				}
			
			
			//User Read method
			/*public String userReadFunds(){
				
				String output = "";
			
				try{
					
					Connection con = connect();
			
					if (con == null){
						
						return "Error while connecting to the database for reading."; 
						
					}
			
					//html table to be displayed
			
					output = "<table border='1'><tr><th>Fund Code</th><th>Fund Name</th>" + "<th>Fund Sponser</th>" + "<th>Email</th>" + "<th>Mobile</th>" + "<th>Fund Price</th>" + "<th>Fund Description</th>";
					String query = "select * from fund";
					Statement stmt = con.createStatement();
					ResultSet rs = stmt.executeQuery(query);
			
					// iterate through the rows in the result set
					while (rs.next()){
			
						//String FundID = Integer.toString(rs.getInt("FundID"));
						String FundCode = rs.getString("FundCode");
						String FundName = rs.getString("FundName");
						String FundSponser = rs.getString("FundSponser");
						String Email = rs.getString("Email");
						String Mobile = rs.getString("Mobile");
						String FundPrice = Double.toString(rs.getDouble("FundPrice"));
						String FundDesc = rs.getString("FundDesc");
			
						// Add into the html table
						output += "<tr><td>" + FundCode + "</td>";
						output += "<td>" + FundName + "</td>";
						output += "<td>" + FundSponser + "</td>";
						output += "<td>" + Email + "</td>";
						output += "<td>" + Mobile + "</td>";
						output += "<td>" + FundPrice + "</td>";
						output += "<td>" + FundDesc + "</td>";
			
						// buttons
						output += "<td><input name='btnApply' type='button' value='Apply' class='btn btn-secondary'></td></tr>";
			
					}
			
					con.close();
			
					// Complete the html table
					output += "</table>";
			
				}catch (Exception e){
					
					output = "Error while reading the funds.";
					System.err.println(e.getMessage());
			
				}
			
				return output;
				} */
			
			
			//Insert method
			public String insertFund(String code, String name, String sponser, String email, String mobile, String price, String desc){
				
				String output = "";
			
				try{
				
					Connection con = connect();
			
					if (con == null){
				
						return "Error while connecting to the database for inserting."; 
				
					}
			
					// create a prepared statement
					String query = " insert into fund(`FundID`,`FundCode`,`FundName`,`FundSponser`,`Email`,`Mobile`,`FundPrice`,`FundDesc`)" + " values (?, ?, ?, ?, ?, ?, ?, ?)";
					PreparedStatement preparedStmt = con.prepareStatement(query);
			
					// binding values
					preparedStmt.setInt(1, 0);
					preparedStmt.setString(2, code);
					preparedStmt.setString(3, name);
					preparedStmt.setString(4, sponser);
					preparedStmt.setString(5, email);
					preparedStmt.setString(6, mobile);
					preparedStmt.setDouble(7, Double.parseDouble(price));
					preparedStmt.setString(8, desc);
			
					// execute the statement
					preparedStmt.execute();
					con.close();
					//output = "Fund Inserted successfully";
					
					String newItems = readFunds();
					output = "{\"status\":\"success\", \"data\": \"" + newItems + "\"}";
				
				}catch (Exception e){
					
					//output = "Error while inserting the Fund.";
					output = "{\"status\":\"error\", \"data\":\"Error while inserting the fund.\"}";
					System.err.println(e.getMessage());
				}	
			
				return output;
			}
			
			
			//Update method
			public String updateFund(String ID, String code, String name, String sponser, String email, String mobile, String price, String desc){
				
				String output = "";
				
				try{
					
					Connection con = connect();
				
					if (con == null){
						
						return "Error while connecting to the database for updating."; 
						
					}
				
					// create a prepared statement
				
					String query = "UPDATE fund SET FundCode=?,FundName=?,FundSponser=?,Email=?,Mobile=?,FundPrice=?,FundDesc=? WHERE FundID=?";
					PreparedStatement preparedStmt = con.prepareStatement(query);
				
					// binding values
					preparedStmt.setString(1, code);
					preparedStmt.setString(2, name);
					preparedStmt.setString(3, sponser);
					preparedStmt.setString(4, email);
					preparedStmt.setString(5, mobile);
					preparedStmt.setDouble(6, Double.parseDouble(price));
					preparedStmt.setString(7, desc);
					preparedStmt.setInt(8, Integer.parseInt(ID));
					
					// execute the statement
					preparedStmt.execute();
					con.close();
					//output = "Updated successfully";
					
					String newItems = readFunds();
					output = "{\"status\":\"success\", \"data\": \"" + newItems + "\"}";
					
				}catch (Exception e){
					
					//output = "Error while updating the Fund.";
					output = "{\"status\":\"error\", \"data\":\"Error while updating the fund.\"}";
					System.err.println(e.getMessage());
				
				}
				
				return output;
				
			}
			
			//Delete method
			public String deleteFund(String FundID){
				
				String output = "";
				
				try{
					
					Connection con = connect();
				
					if (con == null){
						
						return "Error while connecting to the database for deleting."; 
						
					}
				
					// create a prepared statement
					String query = "delete from fund where FundID=?";
					PreparedStatement preparedStmt = con.prepareStatement(query);
				
					// binding values
					preparedStmt.setInt(1, Integer.parseInt(FundID));
				
					// execute the statement
					preparedStmt.execute();
					con.close();
					//output = "Fund Deleted successfully";
				
					String newItems = readFunds();
					output = "{\"status\":\"success\", \"data\": \"" + newItems + "\"}";
					
				}catch (Exception e){
					
					//output = "Error while deleting the Fund.";
					output = "{\"status\":\"error\", \"data\":\"Error while deleting the fund.\"}";
					System.err.println(e.getMessage());		
				}
				
				return output;
				
			}
}
