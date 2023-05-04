package fireants.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


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
public class Member {
	
	@Id
	private String userId;
	private String password;	
	private String nickname;
	private String role;
	private Long KRW;
	private String coinType;
	private Long coinNum;
	private Long income;	
	//json ignore..
	@OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Trade> trades = new ArrayList<>();
}
