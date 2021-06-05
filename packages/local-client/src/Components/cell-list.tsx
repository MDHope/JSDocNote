import "./cell-list.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment, useEffect } from "react";
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state: RootState) =>
    state.cells?.order.map((id) => state.cells?.data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const renderedCells = cells?.map((cell) => {
    if (cell) {
      return (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      );
    } else return "";
  });

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
