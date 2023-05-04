package fireants.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	@JoinColumn(name = "userId", nullable = false)
	private Member member;
}
