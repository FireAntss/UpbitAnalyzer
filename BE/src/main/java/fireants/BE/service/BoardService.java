package fireants.BE.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import fireants.BE.configuration.jwt.JwtProperties;
import fireants.BE.domain.Board;
import fireants.BE.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    private String findUsername(HttpServletRequest req) {
        String authorization = req.getHeader("Authorization");
        String jwtToken = authorization.replace("Bearer ", "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

        return username;
    }

    private boolean isCorrectUser(Board board, HttpServletRequest req) {
        String username = findUsername(req);
        if (!(board.getWriter().equals(username)))
            return false;
        return true;
    }

    public List<Board> getBoardList() {
        return boardRepository.findAll();
    }

    public Board getBoard(HttpServletRequest req) {

        String authorization = req.getHeader("Authorization");
        String jwtToken = authorization.replace("Bearer ", "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

        return boardRepository.findByWriter(username);
    }


    public String insertBoard(Board board, HttpServletRequest req) {

        String authorization = req.getHeader("Authorization");
        String jwtToken = authorization.replace("Bearer ", "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

        board.setWriter(username);
        board.setCnt(0);
        board.setCreateDate(new Date());
        boardRepository.save(board);
        return "SUCCESS";
    }

    public String updateBoard(Board board, HttpServletRequest req) {

        if (isCorrectUser(board, req)) {
            Board findBoard = boardRepository.findById(board.getBoardNum()).get();

            findBoard.setTitle(board.getTitle());
            findBoard.setContent(board.getContent());
            findBoard.setCreateDate(new Date());

            boardRepository.save(findBoard);

            return "SUCCESS";
        }
        return "FAIL";
    }

    public String deleteBoard(Board board, HttpServletRequest req) {

        if (isCorrectUser(board, req)){
            Board findBoard = boardRepository.findById(board.getBoardNum()).get();
            boardRepository.delete(findBoard);

            return "SUCCESS";
        }
        return "FAIL";
    }

    public String deleteBoardByAdmin(Board board) {

        Board findBoard = boardRepository.findById(board.getBoardNum()).get();
        boardRepository.delete(findBoard);
        return "SUCCESS";
    }
}
