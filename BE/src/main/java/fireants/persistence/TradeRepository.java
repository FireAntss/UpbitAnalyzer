package fireants.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fireants.domain.Trade;

public interface TradeRepository extends JpaRepository<Trade, Long> {

	public List<Trade> findByMemberUserId(String userId);
}
