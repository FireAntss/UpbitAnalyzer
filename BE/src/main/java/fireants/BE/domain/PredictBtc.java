package fireants.BE.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PredictBtc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;
    @Temporal(TemporalType.TIMESTAMP)
    private Date tradeDate;
    private Float prediction;
    private Float probability;
<<<<<<< HEAD
=======

>>>>>>> a6ad1062c46bf99a55bebbf83e7a33568b508189
}
