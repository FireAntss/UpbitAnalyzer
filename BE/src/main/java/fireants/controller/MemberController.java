package fireants.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import fireants.domain.Member;
import fireants.domain.Trade;
import fireants.service.MemberService;

//@SessionAttributes("member") //session 오류 발생
@RestController
public class MemberController {
	
	private final MemberService memberService;
		
	@Autowired
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
//	@ModelAttribute("member")
//	public Member setMember() {
//		return new Member();
//	}
	
	@PostMapping("/api/users/newUser")
	public Map<String, Object> newMember(@RequestBody Member member) {
		return memberService.newMember(member);	
	}
	
	@PostMapping("/api/users/login")
	public void login(@RequestBody Member member, Model model) {
//		if (memberService.login(member).get("status").equals("success")) {
//			Member findMember = memberService.getmember(member);
//			model.addAttribute("member", findMember);
//			return memberService.login(member);
//		}
//		return memberService.login(member);
//		Map<String, Object> ret = memberService.login(member);
//		if (ret.get("status").equals("success")) {			
//			model.addAttribute("member", member);			
//		}
//		return ret;		
	}
	
	@GetMapping("/api/users/logout")
	public Map<String, Object> logout(SessionStatus status) {
		return memberService.logout(status);
	}
	
	@DeleteMapping("api/users/{userId}")
	public Map<String, Object> deleteMember(@PathVariable("userId") String userId) {
		return memberService.deleteMember(userId);
	}
	
	@PutMapping("api/users/{userId}")
	public Map<String, Object> updateMember(@PathVariable("userId") String userId, @RequestBody Member member) {
		return memberService.updateMember(userId, member);
	}	
	
	@GetMapping("api/users/{userId}/userInfo")
	public Member getMember(@PathVariable("userId") String userId) {
		return memberService.getMember(userId);
	}
		
	@GetMapping("api/users/{userId}/tradeDetails")
	public List<Trade> getTrade(@PathVariable("userId") String userId) {
		return memberService.getTrade(userId);
	}
}
