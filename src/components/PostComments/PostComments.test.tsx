import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários', () => {
        render(<PostComment />);

        const input = screen.getByTestId('comment-input');
        const submitButton = screen.getByTestId('comment-submit');

        fireEvent.change(input, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(submitButton);

        fireEvent.change(input, { target: { value: 'Segundo comentário' } });
        fireEvent.click(submitButton);

        const comments = screen.getAllByTestId('comment-item');
        expect(comments).toHaveLength(2);
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
    });
});