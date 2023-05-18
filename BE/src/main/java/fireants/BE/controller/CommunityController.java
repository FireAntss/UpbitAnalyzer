package fireants.BE.controller;

import fireants.BE.domain.Board;
import fireants.BE.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/community")
public class CommunityController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/getBoardList")
    public List<Board> getBoardList() {
        return boardService.getBoardList();
    }

    @GetMapping("/getBoard")
    public Board getBoard(HttpServletRequest req) {
        return boardService.getBoard(req);
    }

    @PostMapping("/insertBoard")
    public String insertBoard(@RequestBody Board board, HttpServletRequest req) {
        return boardService.insertBoard(board, req);
    }

    @PutMapping("/updateBoard")
    public String updateBoard(@RequestBody Board board, HttpServletRequest req) {
        return boardService.updateBoard(board, req);
    }

    @DeleteMapping("/deleteBoard")
    public String deleteBoard(@RequestBody Board board, HttpServletRequest req) {
        return boardService.deleteBoard(board, req);
    }

    @DeleteMapping("/deleteBoardByAdmin")
    public String deleteBoardByAdmin(@RequestBody Board board) {
        return boardService.deleteBoardByAdmin(board);
    }
}
