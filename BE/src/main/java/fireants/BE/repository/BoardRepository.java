package fireants.BE.repository;

import fireants.BE.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByWriter(String username);
}
