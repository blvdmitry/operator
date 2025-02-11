import { Reshaped, Calendar, View } from "reshaped";
import "reshaped/themes/reshaped/theme.css";

export default function Home() {
  return (
    <Reshaped>
      <View width="400px">
        <Calendar range />
      </View>
    </Reshaped>
  );
}
