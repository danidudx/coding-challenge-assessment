import React, { useState } from "react";

import Block from "../Block";

import styles from "./styles.module.css";

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {
  // Contains all hashes
  const [hashes, setHashes] = useState<string[]>([]);
  const [blockNumbers, setBlockNumbers] = useState<number[]>([]);

  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    setBlockNumbers([...blockNumbers, blockNumbers.length + 1]);
  };

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    setBlockNumbers((prev) => prev.slice(0, -1));
  };

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */

  const onHash = (_block: number, hash: string) => {
    setHashes((prev) => {
      const newHashes = [...prev];
      newHashes[_block - 1] = hash;
      return newHashes;
    });
  };

  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {blockNumbers.length}</div>
      {blockNumbers.map((blockNumber, index) => (
        <Block
          key={index}
          block={blockNumber}
          hash={hashes[index]}
          onHash={onHash}
          onDelete={index === blockNumbers.length - 1 ? onDelete : undefined}
          previousHash={index === 0 ? "0".repeat(64) : hashes[index - 1]}
        />
      ))}
      {/* <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete} /> */}
      <button type="button" onClick={() => onAdd()}>
        Add Block
      </button>
    </div>
  );
};

export default BlockChain;
