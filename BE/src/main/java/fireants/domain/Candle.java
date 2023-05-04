package fireants.domain;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Candle {
	
	@Id
	private String candle_date_time_kst;
	private String candle_date_time_utc;
	private String market;
	private Double opening_price;
	private Double high_price;
	private Double low_price;
	private Double trade_price;
	private Long timestamp;
	private Double candle_acc_trade_price;
	private Double candle_acc_trade_volume;	
	private Integer unit;
	
}
