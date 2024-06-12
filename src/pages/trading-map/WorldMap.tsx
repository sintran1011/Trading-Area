import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import geography from "../../geography.json";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  GeographyCountry,
  GroupArea,
  RowsData,
  Zoom,
} from "../../services/models";
import { Tooltip } from "@mui/material";
import { formatComma, openFullscreen, renderColorByIndex } from "../../utils";

interface IProps {
  data: RowsData[];
  totalWorld: number;
  groupArea: GroupArea[];
  tab: string;
}

const WorldMap = (props: IProps) => {
  const { data = [], totalWorld = 0, groupArea = [], tab = "" } = props;
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleMoveEnd = (position: Zoom) => {
    setPosition(position);
  };

  const renderTooltipByTabName = (country: RowsData) => {
    switch (tab) {
      case "shipments":
        return (
          <p className="text-normal leading-5">
            <span className="pr-2">{formatComma(country?.shipments)}</span>
            <span className="text-gray-600">Shipments</span>
          </p>
        );
      case "weight":
        return (
          <p className="text-normal leading-5">
            <span className="pr-2">{formatComma(country?.weight)}</span>
            <span className="text-gray-600">Weights</span>
          </p>
        );
      case "teu":
        return (
          <p className="text-normal leading-5">
            <span className="pr-2">{formatComma(country?.teu)}</span>
            <span className="text-gray-600">Teu</span>
          </p>
        );
      default:
        return;
    }
  };

  const renderTooltip = (country: RowsData) => {
    const percentage = (
      (Number(country?.shipments) / totalWorld) *
      100
    ).toFixed(2);
    return (
      <div className="p-1 text-white">
        <p className="font-medium text-lg leading-6">{percentage}%</p>
        <p className="text-normal leading-5">{country?.country}</p>
        {renderTooltipByTabName(country)}
      </div>
    );
  };

  const renderColorGuideColumn = () => {
    return (
      <div className="flex flex-col absolute left-2 bottom-2">
        {groupArea.map((i, index) => {
          const color = renderColorByIndex(index);
          return (
            <div
              style={{ background: color }}
              className="w-2 h-10"
              key={i.area}
            />
          );
        })}
      </div>
    );
  };

  const findColorByGroupCountry = (country: string) => {
    const indexGroupCountry = groupArea.findIndex(
      (i) => !!i.groupCountry.find((item) => item.country === country)
    );
    return renderColorByIndex(indexGroupCountry);
  };

  return (
    <div className="bg-gray-100 mb-4 rounded-md relative">
      <div className="absolute flex gap-2 justify-end items-center right-2 top-2">
        <span onClick={openFullscreen} className="cursor-pointer">
          <FullscreenIcon />
        </span>
        <span onClick={handleZoomIn} className="cursor-pointer">
          <ZoomInIcon />
        </span>
        <span onClick={handleZoomOut} className="cursor-pointer">
          <ZoomOutIcon />
        </span>
      </div>
      {renderColorGuideColumn()}
      <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geography}>
            {({ geographies }) =>
              geographies.map((geo: GeographyCountry) => {
                const color =
                  findColorByGroupCountry(geo.properties.name) || "";
                const country = data.find(
                  (i) => i.country === geo.properties.name
                );
                return (
                  <Tooltip
                    className="bg-black"
                    title={country ? renderTooltip(country) : ""}
                    placement="right-start"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "black",
                        },
                      },
                    }}
                  >
                    <Geography
                      onMouseEnter={() =>
                        setCurrentCountry(geo.properties.name)
                      }
                      key={geo.rsmKey}
                      geography={geo}
                      stroke={"#9ca3af"}
                      style={{
                        default: {
                          fill: color || "white",
                        },
                        hover: {
                          fill: "#ec4899",
                        },
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
