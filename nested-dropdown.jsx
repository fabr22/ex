import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import styles from './nested-dropdown.module.scss';
import { raleway } from '@/pages/_app';
import ArrowIcon from '@/assets/arrow';

function NestedDropdown({ categories, chooseCategory, fullPath = '' }) {
  const path = fullPath.split(' / ');

  const [open, setOpen] = useState({});

  useEffect(() => {
    const temp = categories.reduceRight((acc, cur) => {
      acc[cur.name] = !!path.includes(cur.name);
      return acc;
    }, {});
    setOpen(temp);
  }, []);

  const handleOpen = (el) => {
    const obj = categories.reduce((acc, cur) => {
      acc[cur.name] = false;
      return acc;
    }, {});
    setOpen({ ...obj, [el.name]: true });
    chooseCategory(el);
  };

  return createPortal(
    <div className={styles.dropdown}>
      {categories.map((el) => (
        <React.Fragment key={el.id}>
          <button
            className={`${styles.categoryItem} ${
              open[el.name] ? styles.active : ''
            }`}
            onClick={() => handleOpen(el)}
            type="button"
          >
            <div
              className={`${styles.categoryName} ${
                el.children.length === 0 && open[el.name] ? styles.active : ''
              }`}
              style={{ fontFamily: raleway.style.fontFamily }}
            >
              {el.name}
            </div>

            {el.children.length !== 0 ? (
              <Box
                sx={{
                  marginLeft: '10px',
                  '& svg': {
                    rotate: '-90deg',
                  },
                }}
              >
                <ArrowIcon />
              </Box>
            ) : null}
          </button>
          {open[el.name] && el.children?.length !== 0 ? (
            <NestedDropdown
              categories={el.children}
              chooseCategory={chooseCategory}
              fullPath={fullPath}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>,
    document.getElementById('portal'),
  );
}

export default NestedDropdown;
