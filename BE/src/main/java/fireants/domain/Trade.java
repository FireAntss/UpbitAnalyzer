package fireants.domain;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
