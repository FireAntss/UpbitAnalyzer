package fireants.BE.service;

import fireants.BE.domain.PredictBtc;
import fireants.BE.repository.PredictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictService {

    @Autowired
    private PredictRepository predictRepository;

    public List<PredictBtc> getPredict() {
        return predictRepository.findAll();
    }
}
