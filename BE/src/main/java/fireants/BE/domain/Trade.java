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
    private Date transactionTime;
    private String start;
    private String end;
    private Double volume;
    private Double transactionUnitPrice;
    private Double transactionPrice;
    private Double fee;


    @ManyToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
