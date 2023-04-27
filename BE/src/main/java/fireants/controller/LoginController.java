package fireants.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import fireants.domain.Member;
import fireants.service.MemberService;

@RestController
public class LoginController {
	
	private final MemberService memberService;
	//private final LoginLogRepository loginLogRepo;
	
	@Autowired
	public LoginController(MemberService memberService) {
		this.memberService = memberService;		
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(Member member) {
		Map<String, Object> map = new HashMap<>();
		try {
			Member findMember = memberService.getmember(member);
			if (findMember != null && findMember.getPass().equals(member.getPass())) {
				map.put("status", "success");
				map.put("message", "인증 성공");			
				return map;		
			} else {
				map.put("status", "fail");
				map.put("message", "비밀번호가 틀림");
				return map;
			}
		} catch(Exception e) {
			map.put("status", "fail");
			map.put("message", "없는 아이디임");
			return map;
		}
	}
	
	
	
}
