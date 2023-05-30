package fireants.BE.controller;

import fireants.BE.domain.PredictBtc;
import fireants.BE.service.PredictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/predict")
public class PredictController {

    @Autowired
    private PredictService predictService;

    @GetMapping("/getpredict")
    public List<PredictBtc> getPredict() {
        return predictService.getPredict();
    }
}
