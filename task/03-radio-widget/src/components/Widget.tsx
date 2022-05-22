import BackArrow from "../assets/back-arrow.png";
import Minus from "../assets/minus.png";
import Plus from "../assets/plus.png";
import Switch from "../assets/switch.png";
import Icon from "../assets/radio-icon.png";
import WidgetStyle from "./Widget.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectAllWidget, updateActiveStations } from "../store/widgetSlice";

export default function Widget() {
    const dispatch = useDispatch();
    const radioStations = useSelector(selectAllWidget);

    const handleClick = (e: any) => {};

    const startTheStation = (id: string) => {
        dispatch(updateActiveStations(id));
    };

    return (
        <div className={WidgetStyle.container}>
            <div className={WidgetStyle.topContainer}>
                <img
                    className={WidgetStyle.img}
                    onClick={handleClick}
                    src={BackArrow}
                    alt="back arrow"
                />
                <h1 className={WidgetStyle.topTitle}>STATIONS</h1>
                <img className={WidgetStyle.img} onClick={handleClick} src={Switch} alt="switch" />
            </div>
            <div className={WidgetStyle.midContainer}>
                {radioStations?.map((radioStation: any) => (
                    <div key={radioStation.id}>
                        {radioStation.isShowing && (
                            <div className={WidgetStyle.midImgContainer}>
                                <img
                                    className={WidgetStyle.midImg}
                                    onClick={handleClick}
                                    src={Minus}
                                    alt="back arrow"
                                />
                                <img className={WidgetStyle.midIcon} src={Icon} alt="radio icon" />
                                <img
                                    className={WidgetStyle.midImg}
                                    onClick={handleClick}
                                    src={Plus}
                                    alt="switch"
                                />
                            </div>
                        )}
                        <div
                            className={WidgetStyle.stationContainer}
                            onClick={() => startTheStation(radioStation.id)}
                        >
                            <h3>{radioStation.title}</h3>
                            <h3>{radioStation.frequency}</h3>
                        </div>
                        <hr className={WidgetStyle.line} />
                    </div>
                ))}
            </div>
            <hr className={WidgetStyle.line} />
            <div className={WidgetStyle.botContainer}>
                {radioStations?.map(
                    (radioStation: any) =>
                        radioStation.isShowing && (
                            <>
                                <h6 className={WidgetStyle.botTitle}>Currently Playing</h6>
                                <h3 className={WidgetStyle.botStationTitle}>
                                    {radioStation.title}
                                </h3>
                            </>
                        )
                )}
            </div>
        </div>
    );
}
