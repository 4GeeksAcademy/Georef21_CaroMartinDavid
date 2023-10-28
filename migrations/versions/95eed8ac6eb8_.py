"""empty message

Revision ID: 95eed8ac6eb8
Revises: e45b5a4f2da0
Create Date: 2023-10-28 02:01:37.576955

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95eed8ac6eb8'
down_revision = 'e45b5a4f2da0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('specialist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('profesion', sa.String(length=120), nullable=False),
    sa.Column('area_de_desempeño', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('specialist')
    # ### end Alembic commands ###
