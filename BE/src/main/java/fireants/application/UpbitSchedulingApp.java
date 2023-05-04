package fireants.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UpbitSchedulingApp {
	public static void main(String[] args) {
        SpringApplication.run(UpbitSchedulingApp.class, args);
    }
}
