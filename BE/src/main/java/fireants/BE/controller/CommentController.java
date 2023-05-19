package fireants.BE.controller;

import fireants.BE.domain.Board;
import fireants.BE.domain.Comment;
import fireants.BE.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/insert")
    public String insert(@RequestBody Comment comment, HttpServletRequest request) {
        return commentService.insert(comment, request);
    }

    @GetMapping("/getList")
    public List<Comment> getList() {
        return commentService.getList();
    }

    @DeleteMapping("/delete")
    public String delete(@RequestBody Comment comment, HttpServletRequest request) {
        return commentService.delete(comment, request);
    }
}
