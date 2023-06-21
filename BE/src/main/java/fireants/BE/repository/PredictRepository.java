package fireants.BE.repository;

import fireants.BE.domain.PredictBtc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictRepository extends JpaRepository<PredictBtc, Long> {
}
