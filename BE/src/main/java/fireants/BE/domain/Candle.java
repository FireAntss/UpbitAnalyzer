package fireants.BE.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
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
