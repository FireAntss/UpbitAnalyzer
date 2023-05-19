package fireants.BE.service;

import fireants.BE.domain.Board;
import fireants.BE.repository.BoardRepository;
import fireants.BE.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    private boolean isCorrectUser(Board board, HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);
        if (!(board.getWriter().equals(username)))
            return false;
        return true;
    }

    public List<Board> getBoardList() {
        return boardRepository.findAll();
    }

    public Board getBoard(HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);

        return boardRepository.findByWriter(username);
    }


    public String insertBoard(Board board, HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);

        board.setWriter(username);
        board.setCnt(0);
        board.setCreateDate(new Date());
        boardRepository.save(board);
        return "SUCCESS";
    }

    public String updateBoard(Board board, HttpServletRequest request) {

        if (isCorrectUser(board, request)) {
            Board findBoard = boardRepository.findById(board.getBoardId()).get();

            findBoard.setTitle(board.getTitle());
            findBoard.setContent(board.getContent());
            findBoard.setCreateDate(new Date());

            boardRepository.save(findBoard);

            return "SUCCESS";
        }
        return "FAIL";
    }

    public String deleteBoard(Board board, HttpServletRequest request) {

        if (isCorrectUser(board, request)){
            Board findBoard = boardRepository.findById(board.getBoardId()).get();
            boardRepository.delete(findBoard);

            return "SUCCESS";
        }
        return "FAIL";
    }

    public String deleteBoardByAdmin(Board board) {

        Board findBoard = boardRepository.findById(board.getBoardId()).get();
        boardRepository.delete(findBoard);
        return "SUCCESS";
    }
}
