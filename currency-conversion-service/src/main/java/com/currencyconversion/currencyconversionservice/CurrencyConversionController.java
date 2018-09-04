package com.currencyconversion.currencyconversionservice;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CurrencyConversionController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	/*
	 * Without using Feign client
	 */
	/*
	 * @GetMapping("/currency-converter/from/{from}/to/{to}/quantity/{quantity}")
	 * public CurrencyConversionBean convertCurrency(@PathVariable String
	 * from, @PathVariable String to,
	 * 
	 * @PathVariable BigDecimal quantity) {
	 * 
	 * Map<String, String> uriVariables = new HashMap<>(); uriVariables.put("from",
	 * from); uriVariables.put("to", to);
	 * 
	 * ResponseEntity<CurrencyConversionBean> responseEntity = new
	 * RestTemplate().getForEntity(
	 * "http://localhost:8000/currency-exchange/from/{from}/to/{to}",
	 * CurrencyConversionBean.class, uriVariables);
	 * 
	 * CurrencyConversionBean response = responseEntity.getBody();
	 * 
	 * return new CurrencyConversionBean(response.getId(), from, to,
	 * response.getConversionMultiple(), quantity,
	 * quantity.multiply(response.getConversionMultiple()), response.getPort()); }
	 */

	/*
	 * Using Feign client
	 */
	// @Autowired
	// private CurrencyExchangeServiceProxy proxy;
	@Autowired
	RestTemplate restTemplate;

	// @GetMapping("/currency-converter-feign/from/{from}/to/{to}/quantity/{quantity}")
	@GetMapping("/currency-converter/from/{from}/to/{to}/quantity/{quantity}")
	public CurrencyConversionBean convertCurrencyFeign(@PathVariable String from, @PathVariable String to,
			@PathVariable BigDecimal quantity) {

		// CurrencyConversionBean response = proxy.retrieveExchangeValue(from, to);

		Map<String, String> params = new HashMap<>();
		params.put("from", from);
		params.put("to", to);

		CurrencyConversionBean response = restTemplate.getForObject(
				"http://forex-service:8000/currency-exchange/from/{from}/to/{to}", CurrencyConversionBean.class,
				params);

		logger.info("{}", response);

		return new CurrencyConversionBean(response.getId(), from, to, response.getConversionMultiple(), quantity,
				quantity.multiply(response.getConversionMultiple()), response.getPort());
	}
}
