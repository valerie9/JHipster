package at.fhv.ubertwo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.fhv.ubertwo.web.rest.TestUtil;

public class CarRideTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarRide.class);
        CarRide carRide1 = new CarRide();
        carRide1.setId(1L);
        CarRide carRide2 = new CarRide();
        carRide2.setId(carRide1.getId());
        assertThat(carRide1).isEqualTo(carRide2);
        carRide2.setId(2L);
        assertThat(carRide1).isNotEqualTo(carRide2);
        carRide1.setId(null);
        assertThat(carRide1).isNotEqualTo(carRide2);
    }
}
