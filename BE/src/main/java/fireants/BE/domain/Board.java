package fireants.BE.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNum;
    private String title;
    private String content;
    private String writer;
    @Temporal(TemporalType.DATE)
    private Date createDate;
    private Integer cnt;
}
