/**
 * 
 */
package com.example.ai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai.service.impl.MainServiceImpl;
import com.google.gson.Gson;

/**
 * MainController.java
 * @author 씽크2
 * @Date 2021. 2. 4.
 */
@RestController
public class MainController {
	
	@Autowired MainServiceImpl msi;
	
	@RequestMapping("/main/chart_list")
	public String getChartList(String USER_ENO) throws Exception {
		Gson gson = new Gson();
		List<Map<String, String>> brList = msi.main_chart_tot(USER_ENO);
		String json = gson.toJson(brList);
		return json;
		
	}
	
}
