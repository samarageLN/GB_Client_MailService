package model;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/MailsAPI")
public class MailsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Mail mail = new Mail();
	String stsMsg = "";
    
    public MailsAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			mail.sendCustomMail(request.getParameter("to"), request.getParameter("subject"),
					request.getParameter("message"));
		} catch (Exception e) {
						e.printStackTrace();
		}
		doGet(request, response);
	}

	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request);
		stsMsg =mail.updateMail(paras.get("hidItemIDSave").toString(),paras.get("to").toString(),paras.get("subject").toString(),paras.get("message").toString());
		response.getWriter().write(stsMsg);
	}

	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request);
	   stsMsg = mail.removeEmail(paras.get("hidItemIDDelete").toString());
	   response.getWriter().write(stsMsg);
	}
	
	
	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request) {
			Map<String, String> map = new HashMap<String, String>();
			try {
				Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
				String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
				scanner.close();
				String[] params = queryString.split("&");
				for (String param : params) {
					String[] p = param.split("=");
					map.put(p[0], p[1]);
				}
			} catch (Exception e) {
			}
			return map;
		}


}
