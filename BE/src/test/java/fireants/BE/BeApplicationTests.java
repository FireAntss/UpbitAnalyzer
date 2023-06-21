package fireants.BE;

import fireants.BE.domain.Board;
import fireants.BE.domain.Comment;
import fireants.BE.domain.User;
import fireants.BE.repository.BoardRepository;
import fireants.BE.repository.CommentRepository;
import fireants.BE.repository.UserRepository;
import fireants.BE.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class BeApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Test
	void changeRoleToAdmin() {
		User findUser = userRepository.findByUsername("yuhyun");
		findUser.setRole("ROLE_ADMIN");
		userRepository.save(findUser);
	}

	@Test
	void insertBoard() {
		User findUser = userRepository.findByUsername("yuhyun1");

		for (int i = 0; i < 10; i++) {
			Board board = new Board();

			board.setTitle("title" + i);
			board.setContent("content" + i);
			board.setWriter("yuhyun1");
			board.setCnt(0);

			boardRepository.save(board);
		}
	}

	@Test
	void insertComment() {
		User findUser = userRepository.findByUsername("yuhyun1");
		Board findBoard = boardRepository.findById(1L).get();

		for (int i = 0; i < 10; i++) {
			Comment comment = new Comment();

			comment.setUser(findUser);
			comment.setComment("comment"+i);
			comment.setCreateDate(new Date());
			comment.setBoard(findBoard);

			commentRepository.save(comment);
		}
	}
}
