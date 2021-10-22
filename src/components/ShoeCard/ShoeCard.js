import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANTS = {
  on_sale: {
    "--content": "'Sale'",
    "--background": COLORS.primary,
  },
  new_release: {
    "--content": "'Just Released!'",
    "--background": COLORS.secondary,
  },
  default: {
    "--content": "",
    "--background": "transparent",
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on_sale'
    : isNewShoe(releaseDate)
      ? 'new_release'
      : 'default'

  console.log(variant)

  const VARS = VARIANTS[variant]
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper style={VARS}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === 'on_sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on_sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
  position: relative;
`;

const Wrapper = styled.article`
  /* Little flag based on variant */
  &::after {
    content: var(--content);
    background-color: var(--background);
    padding: 8px 10px;
    border-radius: 2px;
    color: ${COLORS.white};
    font-weight: 700;
    position: absolute;
    top: 12px;
    right: -4px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow-hidden;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${p => p.onSale ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
