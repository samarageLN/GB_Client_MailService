<%@page import="model.Mail"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Innovative Projects</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/mails.js"></script>
</head>
<body>

	<div class="container bootdey">
		<div class="email-app">

			<p class="text-center">New Message</p>
			<form id="formItem" name="formItem" method="post" action="mails.jsp">
				<div class="form-row mb-3">
					<label for="to" class="col-2 col-sm-1 col-form-label">To:</label>
					<div class="col-10 col-sm-11">
						<input type="email" class="form-control" id="to" name="to"
							placeholder="Type email">
					</div>
				</div>

				<div class="form-row mb-3">
					<label for="bcc" class="col-2 col-sm-1 col-form-label">Subject:</label>
					<div class="col-10 col-sm-11">
						<input type="email" class="form-control" id="subject"
							name="subject" placeholder="Type email">
					</div>
				</div>


				<div class="form-group mt-4">
					<textarea class="form-control" id="message" name="message"
						rows="12" placeholder="Click here to reply"></textarea>
				</div>
				<div class="form-group">

					<input id="hidItemIDSave" name="hidItemIDSave">

					<div id="alertSuccess" class="alert alert-success"></div>
					<div id="alertError" class="alert alert-danger"></div>

					<input id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-success">

					<button type="submit" class="btn btn-danger">Discard</button>
				</div>

			</form>




			<div id="divItemsGrid">
				<%
					// call the readItems method
				Mail mail = new Mail();
				out.print(mail.readAllMailDetails());
				%>

			</div>

		</div>
	</div>


</body>
</html>