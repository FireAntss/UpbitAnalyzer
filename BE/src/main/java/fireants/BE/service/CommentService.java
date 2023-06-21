package fireants.BE.service;

import fireants.BE.domain.Comment;
import fireants.BE.domain.User;
import fireants.BE.repository.CommentRepository;
import fireants.BE.repository.UserRepository;
import fireants.BE.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    private boolean isCorrectUser(Comment comment, HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);
        if (!(comment.getUser().getUsername().equals(username)))
            return false;
        return true;
    }

    public String insert(Comment comment, HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);
        User user = userRepository.findByUsername(username);

        comment.setUser(user);
        comment.setBoard(comment.getBoard());
        comment.setCreateDate(new Date());
        comment.setComment(comment.getComment());

        commentRepository.save(comment);
        return "SUCCESS";
    }

    public List<Comment> getList() {
        return commentRepository.findAll();
    }

    public String delete(Comment comment, HttpServletRequest request) {
        if (!isCorrectUser(comment, request))
            return "FAIL";

        Comment findComment = commentRepository.findById(comment.getCommentId()).get();
        commentRepository.delete(findComment);
        return "SUCCESS";
    }

    public String update(Comment comment, HttpServletRequest request) {
        if (!isCorrectUser(comment, request))
            return "FAIL";

        Comment findComment = commentRepository.findById(comment.getCommentId()).get();
        findComment.setComment(comment.getComment());
        findComment.setCreateDate(new Date());

        commentRepository.save(findComment);
        return "SUCCESS";
    }
}
