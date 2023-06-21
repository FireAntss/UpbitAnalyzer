package fireants.BE.repository;

import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {

    List<Trade> findTop5ByUserOrderByTradeIdDesc(User user);
}
