package fireants.BE.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionNum;
    @Temporal(TemporalType.DATE)
    private Date transactionTime;   // 현재시간
    private String market;  // BTC, ETH
    private String tradeType;   // buy/sell
    private Double volume;  // 거래량
    private Double transactionUnitPrice;    // 거래단가
    private Double totalPrice;    // 거래액
    private Double fee; // 수수료


    @ManyToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
