package fireants.BE.controller;

import fireants.BE.domain.Board;
import fireants.BE.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/getList")
    public List<Board> getBoardList() {
        return boardService.getBoardList();
    }

    @GetMapping("/get")
    public Board getBoard(HttpServletRequest request) {
        return boardService.getBoard(request);
    }

    @PostMapping("/insert")
    public String insertBoard(@RequestBody Board board, HttpServletRequest request) {
        return boardService.insertBoard(board, request);
    }

    @PutMapping("/update")
    public String updateBoard(@RequestBody Board board, HttpServletRequest request) {
        return boardService.updateBoard(board, request);
    }

    @DeleteMapping("/delete")
    public String deleteBoard(@RequestBody Board board, HttpServletRequest request) {
        return boardService.deleteBoard(board, request);
    }

    @DeleteMapping("/deleteByAdmin")
    public String deleteBoardByAdmin(@RequestBody Board board) {
        return boardService.deleteBoardByAdmin(board);
    }
}
