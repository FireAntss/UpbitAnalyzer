package fireants.persistence;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import fireants.domain.Candle;

public interface CandleRepository extends JpaRepository<Candle, Date> {

	//public Double findCandleByCandle_date_time_kst(Date now);

}
