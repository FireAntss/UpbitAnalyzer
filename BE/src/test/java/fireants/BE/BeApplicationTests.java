package fireants.BE;

import fireants.BE.domain.User;
import fireants.BE.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BeApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Test
	void contextLoads() {
		User findUser = userRepository.findByUsername("yuhyun");
		findUser.setRole("ROLE_ADMIN");
		userRepository.save(findUser);
	}

}
