package at.fhv.ubertwo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.fhv.ubertwo.web.rest.TestUtil;

public class TaxiOfficeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaxiOffice.class);
        TaxiOffice taxiOffice1 = new TaxiOffice();
        taxiOffice1.setId(1L);
        TaxiOffice taxiOffice2 = new TaxiOffice();
        taxiOffice2.setId(taxiOffice1.getId());
        assertThat(taxiOffice1).isEqualTo(taxiOffice2);
        taxiOffice2.setId(2L);
        assertThat(taxiOffice1).isNotEqualTo(taxiOffice2);
        taxiOffice1.setId(null);
        assertThat(taxiOffice1).isNotEqualTo(taxiOffice2);
    }
}
