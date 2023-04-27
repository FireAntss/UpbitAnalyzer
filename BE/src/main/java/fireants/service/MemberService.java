package fireants.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fireants.domain.Member;
import fireants.persistence.MemberRepository;

@Service
public class MemberService {
	
	private final MemberRepository memberRepo;
	
	@Autowired
	public MemberService(MemberRepository memberRepo) {
		this.memberRepo = memberRepo;
	}
	
	public Member getmember(Member member) {		
		return memberRepo.findById(member.getId()).get();
	}
}
