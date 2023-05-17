package fireants.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.support.SessionStatus;

import fireants.domain.Member;
import fireants.domain.Trade;
import fireants.persistence.MemberRepository;
import fireants.persistence.TradeRepository;

@Service
public class MemberService {
	
	private final MemberRepository memberRepo;
	private final TradeRepository tradeRepo;
	
	@Autowired
	public MemberService(MemberRepository memberRepo, TradeRepository tradeRepo) {
		this.memberRepo = memberRepo;
		this.tradeRepo = tradeRepo;
	}
	
	public Member getmember(Member member) {		
		return memberRepo.findById(member.getUserId()).get();
	}
	
	public Map<String, Object> newMember(Member member) {
		Map<String, Object> map = new HashMap<>();
		member.setRole("member");
		try {			
			memberRepo.save(member);			
			map.put("result", "success");
		} catch (Exception e) {
			map.put("result", "fail");
		}
		return map;
	}
	
	public Map<String, Object> login(Member member) {
		Map<String, Object> map = new HashMap<>();
		try {
			Member findMember = memberRepo.findById(member.getUserId()).get();
			if (findMember != null && findMember.getPassword().equals(member.getPassword())) {
				map.put("status", "success");
				map.put("message", "인증 성공");
				member.setRole(findMember.getRole());
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
	
	public Map<String, Object> logout(SessionStatus status) {
		Map<String, Object> map = new HashMap<>();
		try {
			status.setComplete();
			map.put("result", "success");			
		} catch (Exception e) {
			map.put("result", "fail");
		}
		return map;
	}
	
	public Map<String, Object> deleteMember(String userId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Member findMember = memberRepo.findById(userId).get();
			memberRepo.delete(findMember);
			map.put("result", "success");
		} catch (Exception e) {
			map.put("result", "fail");
		}
		return map;	
	}
	
	@SuppressWarnings("static-access")
	public Map<String, Object> updateMember(String userId, Member member) {
		Map<String, Object> map = new HashMap<>();
		try {
			Member findMember = memberRepo.findById(userId).get();
			memberRepo.save(findMember.builder()
					.userId(findMember.getUserId())
					.password(member.getPassword())
					.nickname(member.getNickname())
					.role("member")
					.build());
			map.put("result", "success");
		} catch (Exception e) {
			map.put("result", "fail");
		}
		return map;
	}
	
	public Member getMember(String userId) {
		return memberRepo.findById(userId).get();
	}	
	
	public List<Trade> getTrade(String userId) {
		return tradeRepo.findByMemberUserId(userId);
	}
	

}
