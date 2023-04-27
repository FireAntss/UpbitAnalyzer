package fireants.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import fireants.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

}
